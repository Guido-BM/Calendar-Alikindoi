from todoist_api_python.api_async import TodoistAPIAsync
from todoist_api_python.api import TodoistAPI

# Fetch tasks asynchronously


async def get_tasks_async():
    api = TodoistAPIAsync("YOURTOKEN")
    try:
        tasks = await api.get_tasks()
        print(tasks)
    except Exception as error:
        print(error)

# Fetch tasks synchronously


def get_tasks_sync():
    api = TodoistAPI("my token")
    try:
        tasks = api.get_tasks()
        print(tasks)
    except Exception as error:
        print(error)
