# Text-to-XML converter Script

This repository contains a script for converting text file into XML level file that can be loaded into Science Birds

## Installation

To use this script, you must have <a href="https://nodejs.org/en/" target="_new">Node.js</a> and <a href="https://www.npmjs.com/" target="_new">npm</a> installed on your system.

1. Clone this repository to your local machine.
2. Navigate to the repository directory in your terminal.
3. Run `npm install` to install the necessary dependencies.

## Usage

1. Run the script using the command `npm start -s="<SOURCE_FOLDER>"`. For example, `npm start -s="./test_intermediate"`.
2. The script will output the XML file in the `level/<TARGET_CHARACTER>/<TRIAL_NUMBER>/` folder, which has the same structure as the source folder. The file `_log_<DATE_TIME>.txt` will be created in the same folder.

Please ensure that the source folder has the following structure:

```
<SOURCE_FOLDER>
├── <TARGET_CHARACTER>
│   ├── <TRIAL_NUMBER>
│   │   ├── <FILE_NAME>.txt
│   │   ├── <FILE_NAME>.txt
│   │   └── <FILE_NAME>.txt
│   ├── <TRIAL_NUMBER>
│   │   ├── <FILE_NAME>.txt
│   │   ├── <FILE_NAME>.txt
│   │   └── <FILE_NAME>.txt
│   └── <TRIAL_NUMBER>
│       ├── <FILE_NAME>.txt
│       ├── <FILE_NAME>.txt
│       └── <FILE_NAME>.txt
└── <TARGET_CHARACTER>
    ├── <TRIAL_NUMBER>
    │   ├── <FILE_NAME>.txt
    │   ├── <FILE_NAME>.txt
    │   └── <FILE_NAME>.txt
    ├── <TRIAL_NUMBER>
    │   ├── <FILE_NAME>.txt
    │   ├── <FILE_NAME>.txt
    │   └── <FILE_NAME>.txt
    └── <TRIAL_NUMBER>
        ├── <FILE_NAME>.txt
        ├── <FILE_NAME>.txt
        └── <FILE_NAME>.txt
```
