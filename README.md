# ONLYOFFICE add-on for Volto

Welcome to the ONLYOFFICE add-on for Volto! This integration allows you to seamlessly edit, create, and convert files within your Volto environment using ONLYOFFICE Docs.

Volto is a modern interface for Plone. Learn more about Volto [here](https://plone.org/why-plone/plone-ecosystem/volto). You can also check the official [ONLYOFFICE add-on for Plone](https://github.com/ONLYOFFICE/onlyoffice-plone).

## Add-on installation 📥

### Option 1: Generating a new add-on

**Step 1: Add dependencies**

Before generating a new add-on, ensure the following [dependencies](https://6.docs.plone.org/install/create-project-cookieplone.html#prerequisites-for-installation) are installed:

- uv
- nvm
- Node.js
- Make

**Step 2: Generate a new Volto project**

Run the following command:

```
uvx cookieplone
```

During the setup process, follow these steps:

- **Add-on Title (Volto Add-on)**: Enter `onlyoffice-volto`.
- For the remaining steps, use the default options.

**Step 3: Replace the generated add-on with the existing one**

- Navigate to the `home\onlyoffice-volto\packages` directory.
- Delete the `onlyoffice-volto` directory inside the `packages` folder.
- Replace it with the existing add-on from this repository.

**Step 4: Install and start the add-on**

In the `home\onlyoffice-volto` directory, run the following commands one by one:

```
make install
make start
```
### Option 2: Adding an add-on to an existing project

**Step 1: Install Volto**

- Download Volto from the [official GitHub repository](https://github.com/plone/volto).
- Unzip the downloaded file to your desired directory.

**Step 2: Enable the add-on**

Unzip the ONLYOFFICE add-on into the `packages` directory of your Volto project. The add-on should be placed in the `onlyoffice-volto` folder.

Update the **volto.config.js** file in the root directory of your project:

```
module.exports = {
  addons: ['onlyoffice-volto'],
};
```

Update the **package.json** file in the root directory of your project:

```
"dependencies": {
  "onlyoffice-volto": "workspace:*"
},
```

**Step 3: Install and start the add-on**

Run the following commands in the root directory of your Volto project:

```
make install
make start
```

## Add-on configuration ⚙️

To configure the ONLYOFFICE add-on, follow these steps:

- Navigate to the Volto administration section: click the profile icon in the lower-left corner.
- Go to **Site Setup -> Add-on Configuration -> ONLYOFFICE Configuration**.

Here, you can set up and manage ONLYOFFICE Docs settings, including:

- Document Editing service (URL of your ONLYOFFICE Docs)
- Secret key ([JWT Secret](https://helpcenter.onlyoffice.com/docs/installation/docs-configure-jwt.aspx))

You can also connect to the public test server of ONLYOFFICE Docs for one month by checking the corresponding box.

## Editing files 📝

- Go to the Contents section and locate the file you want to edit.
- Click on the file to open its page.
- In the left menu, click the ONLYOFFICE icon.
- The file will open in the same tab, ready for editing.

## Creating new files 📄

- Navigate to the Contents section.
- Click the ONLYOFFICE icon in the left panel.
- Select the desired file format: Document, Spreadsheet, Presentation, or PDF form.
- The new file will open immediately in the same tab for editing.

## File conversion 🔄

- Open the file page.
- Click the arrow icon to access the conversion options.
- In the pop-up window, select the desired file format.
- Click the arrow button in the lower-right corner to start the conversion.
- The converted file will be downloaded to your device in the selected format.

## Installing ONLYOFFICE Docs

To be able to work with office files within Volto/Plone, you will need an instance of [ONLYOFFICE Docs](https://www.onlyoffice.com/office-suite.aspx). You can install the self-hosted version of the editors or opt for ONLYOFFICE Docs Cloud which doesn't require downloading and installation.

**Self-hosted editors**

You can install [free Community version](https://www.onlyoffice.com/download-community.aspx#docs-community) of ONLYOFFICE Docs or scalable [Enterprise Edition](https://www.onlyoffice.com/download.aspx#docs-enterprise).

To install free Community version, use [Docker](https://github.com/onlyoffice/Docker-DocumentServer) (recommended) or follow [these instructions](https://helpcenter.onlyoffice.com/docs/installation/docs-community-install-ubuntu.aspx) for Debian, Ubuntu, or derivatives.

To install Enterprise Edition, follow the instructions [here](https://helpcenter.onlyoffice.com/docs/installation/enterprise).

**ONLYOFFICE Docs Cloud**

To get ONLYOFFICE Docs Cloud, get started [here](https://www.onlyoffice.com/docs-registration.aspx).

## Need help? Feedback & Support 💡

In case of technical problems, the best way to get help is to submit your issues [here](https://github.com/ONLYOFFICE/onlyoffice-volto/issues). Alternatively, you can contact ONLYOFFICE team via [community.onlyoffice.com](https://community.onlyoffice.com) or [feedback.onlyoffice.com](https://feedback.onlyoffice.com/forums/966080-your-voice-matters).