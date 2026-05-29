export default {
    extends: ['stylelint-config-standard-scss', 'stylelint-config-clean-order'],
    rules: {
        'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['host', 'host-context'] }],
    },
};
