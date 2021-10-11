const TodoList = artifacts.require('./TodoList.sol')


contract('TodoList', (accounts) => {

    before(async () => {
        this.todoList = await TodoList.deployed();
    });

    it('should have initial task', async () => {
        const taskCount = await this.todoList.taskCount();
        const task = await this.todoList.tasks(taskCount)

        assert.equal(task.id.toNumber(), taskCount.toNumber())
    })

    it('should create new task', async () => {
        const taskCount = await this.todoList.taskCount();
        await this.todoList.createTask('blabla');
        const incremented = await this.todoList.taskCount();

        assert.equal(incremented.toNumber() - 1, taskCount.toNumber())
    })
})
