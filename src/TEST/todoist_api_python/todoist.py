from todoist_api_python.api import TodoistAPI

api = TodoistAPI("d5137b3c62cc6c9733acc52bb3064fdb40c1e117")

# try:
#     projects = api.get_projects()
#     print(projects)
# except Exception as error:
#     print(error)

# try:
#     project = api.add_project(name="Shopping List")
#     print(project)
# except Exception as error:
#     print(error)

try:
    task = api.add_task(content="Buy Milk", project_id="2203306141")
    print(task)
except Exception as error:
    print(error, "ERROR")

# try:
#     is_success = api.update_task(task_id="7503090417", due_string="tomorrow")
#     print(is_success)
# except Exception as error:
#     print(error)

try:
    is_success = api.delete_project(project_id="2203306141")
    print(is_success)
except Exception as error:
    print(error)
