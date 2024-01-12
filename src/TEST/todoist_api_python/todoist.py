from todoist_api_python.api import TodoistAPI

api = TodoistAPI("0b41420452dd60a56a6dacb4d37f4d259fcd8587")

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
