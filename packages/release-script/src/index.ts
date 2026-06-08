#!/usr/bin/env node
import { confirm, input, select } from '@inquirer/prompts';
import { valid as semverValid } from 'semver';
import { suggestVersion } from './git.js';
import { discoverPackages } from './packages.js';

async function main() {
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

    const shortName = selected.name.split('/').pop() ?? selected.name;
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
    console.log('Release execution is not yet implemented.');
}

main().catch((error: unknown) => {
    console.error(error);
    process.exit(1);
});
