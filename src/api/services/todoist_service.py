from todoist_api_python.api import TodoistAPI

import logging

logger = logging.getLogger(__name__)


class TodoistService:
    def __init__(self, access_token):
        self.api = TodoistAPI(access_token)

    def get_projects(self):
        try:
            return self.api.get_projects()
        except Exception as e:
            logger.error(f"Error fetching projects: {str(e)}")
            print(e)
            return []  # Return an empty list if there is an error

    def add_project(self, name):
        try:
            return self.api.add_project(name)
        except Exception as error:
            print(error)

    def get_project(self, project_id):
        try:
            return self.api.get_project(project_id)
        except Exception as error:
            print(error)

    def update_project(self, project_id, name):
        try:
            return self.api.update_project(project_id, name)
        except Exception as error:
            print(error)

    def delete_project(self, project_id):
        try:
            return self.api.delete_project(project_id)
        except Exception as error:
            print(error)

    def get_collaborators(self):
        try:
            return self.api.get_collaborators()
        except Exception as error:
            print(error)
