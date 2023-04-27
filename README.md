# Text-to-XML Conversion Script

This repository contains a script for converting text file into XML level file that can be loaded into Science Birds

## Installation

To use this script, you must have <a href="https://nodejs.org/en/" target="_new">Node.js</a> and <a href="https://www.npmjs.com/" target="_new">npm</a> installed on your system.

1. Clone this repository to your local machine.
2. Navigate to the repository directory in your terminal.
3. Run `npm install` to install the necessary dependencies.

## Usage

1. Run the script using the command `npm start -s="<SOURCE_FOLDER>"`. For example, `npm start -s "./competition"`.
2. The script will output the XML file in the `<SOURCE_FOLDER>/<TEAM_NAME>/levels/<CHARACTER>` folder, which has the same structure as the source folder. The file `xml_log_<DATE_TIME>.txt` will be created in the `<SOURCE_FOLDER>/logs` folder.

Please note that `<STAGE>` can be `raw`, `intermediate`, `levels`, `images`, `stability`, or `similarity`. `<CHARACTER>` can be `A`, `B`, `C`, ..., `Z`.

Please ensure that the source folder has the following structure:

```
<SOURCE_FOLDER>
├── <TEAM_NAME>
|   ├── <STAGE>
│   │    └── <CHARACTER>
│   │       ├── <TRIAL_NUMBER>.jpg
│   │       ├── <TRIAL_NUMBER>.jpg
│   │       └── <TRIAL_NUMBER>.png
│   └── <STAGE>
│        └── <CHARACTER>
│           ├── <TRIAL_NUMBER>.txt
│           ├── <TRIAL_NUMBER>.txt
│           └── <TRIAL_NUMBER>.txt
└── <TEAM_NAME>
    ├── <STAGE>
    │    └── <CHARACTER>
    │       ├── <TRIAL_NUMBER>.jpg
    │       ├── <TRIAL_NUMBER>.png
    │       └── <TRIAL_NUMBER>.jpg
    └── <STAGE>
         └── <CHARACTER>
            ├── <TRIAL_NUMBER>.txt
            ├── <TRIAL_NUMBER>.txt
            └── <TRIAL_NUMBER>.txt
```

For example,

```
competition
├── team1
|   ├── images
│   │    └── I
│   │       ├── team1_I_1.jpg
│   │       ├── team1_I_2.jpg
│   │       └── team1_I_3.png
│   └── intermediate
│        └── I
│           ├── team1_I_1.txt
│           ├── team1_I_2.txt
│           └── team1_I_3.txt
└── team2
    ├── images
    │    └── A
    │       ├── team2_A_1.jpg
    │       ├── team2_A_2.png
    │       └── team2_A_3.jpg
    └── raw
         └── B
            ├── team2_B_1.txt
            ├── team2_B_2.txt
            └── team2_B_3.txt
```

## Contributing

If you would like to contribute to this project, please fork this repository and submit a pull request. Please ensure that your code is well documented and that you have tested your code before submitting a pull request.

## Bug Reporting

If you find any bugs, please submit an issue on this repository.