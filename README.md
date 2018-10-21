
Getting started:

1. `composer require 'flowpack/restrictcreation'`
2. Configure your dimensions in Settings.yaml, e.g. like this:

```
Neos:
  ContentRepository:
    contentDimensions:
      language:
        presets:
          en_US:
            label: 'English (US)'
            values:
              - en_US
            uriSegment: en
          en_UK:
            label: 'English (UK)'
            values:
              - en_UK
              - en_US
            uriSegment: uk
            restrictCreation:
              mode: disallow
              originPreset: en_US
          de:
            label: German
            values:
              - de
            uriSegment: de
            restrictCreation:
              mode: warn
              originPreset: en_US
```

`mode: warn` would only give a warning about creating a node in a possible wrong dimensiong.
`mode: disallow` would completely forbid creating new nodes in a certain dimension.

## Acknowledgments

The initial development of this package is sponsored by [web&co](http://webundco.com/).
