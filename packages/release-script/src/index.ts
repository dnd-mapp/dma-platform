#!/usr/bin/env node
import { confirm, input, select } from '@inquirer/prompts';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { valid as semverValid } from 'semver';
import { parseChangelog, promoteChangelog, serializeChangelog } from './changelog.js';
import { commitRelease, createReleaseBranch, openReleasePR, pushBranch, stageFiles, suggestVersion } from './git.js';
import { discoverPackages } from './packages.js';

export async function main() {
    const packages = await discoverPackages(process.cwd());

    if (packages.length === 0) {
        console.error('No releasable packages found. Run from the monorepo root.');
        process.exit(1);
    }
    const enriched = packages.map((pkg) => ({ ...pkg, suggestedVersion: suggestVersion(pkg.name, pkg.path) }));

    const selected = await select({
        message: 'Which package do you want to release?',
        choices: enriched.map((pkg) => ({ name: `${pkg.name} (${pkg.version})`, value: pkg })),
    });

    const version = await input({
        message: 'Version to release:',
        default: selected.suggestedVersion,
        validate: (v) => (semverValid(v) !== null ? true : `"${v}" is not a valid semver string`),
    });

    const shortName = selected.name.replace(/^.*\//, '');
    const branchName = `release/${shortName}-${version}`;

    console.log('\nPlanned actions:');
    console.log(`  • Bump ${selected.name} in ${selected.path}/package.json: ${selected.version} → ${version}`);
    console.log(`  • Promote [Unreleased] in ${selected.path}/CHANGELOG.md to [${version}]`);
    console.log(`  • Create branch: ${branchName}`);
    console.log(`  • Open PR targeting main\n`);

    const proceed = await confirm({ message: 'Proceed with release?', default: true });

    if (!proceed) {
        console.log('Release aborted.');
        process.exit(0);
    }
    console.log('\nBumping package.json...');

    const pkgJsonPath = join(process.cwd(), selected.path, 'package.json');
    const pkgJson = JSON.parse(await readFile(pkgJsonPath, 'utf8')) as Record<string, unknown>;
    pkgJson['version'] = version;

    await writeFile(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + '\n');

    console.log('Promoting CHANGELOG.md...');

    const changelogPath = join(process.cwd(), selected.path, 'CHANGELOG.md');
    const promoted = promoteChangelog({
        changelog: parseChangelog(await readFile(changelogPath, 'utf8')),
        packageName: shortName,
        version: version,
        date: new Date().toISOString().slice(0, 10),
    });
    await writeFile(changelogPath, serializeChangelog(promoted));

    console.log(`Creating branch ${branchName}...`);
    createReleaseBranch(branchName);

    console.log('Staging changes...');
    stageFiles([`${selected.path}/package.json`, `${selected.path}/CHANGELOG.md`]);

    console.log('Committing...');
    commitRelease(shortName, version);

    console.log('Pushing branch...');
    pushBranch(branchName);

    console.log('Opening PR...');
    openReleasePR(shortName, version);

    console.log('\nRelease complete.');
}

/* v8 ignore next 4 */
if (process.env['VITEST'] == null) {
    main().catch((error: unknown) => {
        console.error(error);
        process.exit(1);
    });
}
