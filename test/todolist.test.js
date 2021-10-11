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

    it('Should emit event when creating new task', async () => {
        const result = await this.todoList.createTask('new task')

        const event = result.logs[0].args;

        assert.equal(event.content, 'new task')
    });

    it('Should toggle task', async () => {
        const result = await this.todoList.toggleCompleted(1)
        const tasks = await this.todoList.tasks(1)
        assert.equal(tasks.completed, true)

        const event = result.logs[0].args;

        assert.equal(event.completed, true)

    })
})
