# Search Researcher Devops Project

# Search Researcher Devops Project

Search Researcher is a system designed to provide comprehensive information about Italian researchers and their publications. It integrates with Cineca, Scholar, and Scopus services and exposes two APIs: `search_researchers` and `search_publications`.

## Developer Setup

Follow these steps to set up your development environment:

1. **Install Dependencies**: Run `npm install` to install all necessary dependencies.

2. **Update Hosts File**: Add the following entries to your `/etc/hosts` file:
    ```
    127.0.0.1   scopus-service
    127.0.0.1   scholar-service
    127.0.0.1   cineca-service
    127.0.0.1   search-service
    172.16.174.108  database-service
    ```

3. **Setup Hooks**: Run the script `./setup-hooks.sh`.

## Developer Guidelines

- Never commit or push directly to the `PRODUCTION/MAIN` branch.
- Always work on the `DEVELOP` branch.
- If you want to push to the `PRODUCTION/MAIN` branch, merge first with `DEVELOP` and then push.

## Production Setup

Follow these steps to set up your production environment:

1. **Install Ansible Collections**: Install the required Ansible collections by running the following commands:
    - `ansible-galaxy collection install prometheus.prometheus`
    - `ansible-galaxy collection install community.docker`

## Production 

The application is live at http://172.16.174.108:8000/