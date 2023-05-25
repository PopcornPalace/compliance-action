# My Project

This is a Github Actions to check compliance of a Github repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.

## Usage

```
name: compliance
on:
  pull_request:
  push:
  workflow_dispatch:

jobs:
  check:
    name: compliance
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - uses: PopcornPalace/compliance-action@main
```

If we should check license file to add parameter:
```     
      - uses: PopcornPalace/compliance-action@main
        with:
          check_license: true
```


## Contributing

Contributions are welcome! Please see the [contributing guidelines](CONTRIBUTING.md) for details.

## Reporting Issues

If you encounter any issues or have any suggestions for improvements, please feel free to [create an issue](https://github.com/PopcornPalace/compliance-action/issues).

## Contact

If you have any questions or concerns, please contact me at valentin.nastenko@doublegood.com
.




