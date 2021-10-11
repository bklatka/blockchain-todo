
window.addEventListener('load', async () => {

});

const App = {
    contracts: {},
    loading: false,
    load: async () => {
        console.log('Loading app')
        await App.loadWeb3();
        console.log('Web3 loaded');
        await App.loadAccount();
        await App.loadContract();
        await App.render();
        await App.renderTasks()
    },
    loadWeb3: async () => {
        App.web3Provider = Web3.givenProvider || 'ws://localhost:7545'
        window.web3 = new Web3(App.web3Provider);
    },
    loadAccount: async () => {
        App.account = web3.eth.accounts[0]
        console.log(App.account)
    },
    loadContract: async () => {
        const todoList = await $.getJSON('TodoList.json')
        App.contracts.TodoList = TruffleContract(todoList)
        App.contracts.TodoList.setProvider(App.web3Provider)

        App.todoList = await App.contracts.TodoList.deployed();



    },
    setLoading: (boolean) => {
        App.loading = boolean
        const loader = $('#loader')
        const content = $('#content')
        if (boolean) {
            loader.show()
            content.hide()
        } else {
            loader.hide()
            content.show()
        }
    },
    renderTasks: async () => {
        // Load the total task count from the blockchain
        const taskCount = await App.todoList.taskCount()
        const $taskTemplate = $('.taskTemplate')

        // Render out each task with a new task template
        for (var i = 1; i <= taskCount; i++) {
            // Fetch the task data from the blockchain
            const task = await App.todoList.tasks(i)
            const taskId = task[0].toNumber()
            const taskContent = task[1]
            const taskCompleted = task[2]

            // Create the html for the task
            const $newTaskTemplate = $taskTemplate.clone()
            $newTaskTemplate.find('.content').html(taskContent)
            $newTaskTemplate.find('input')
                .prop('name', taskId)
                .prop('checked', taskCompleted)
                .on('click', App.toggleCompleted)

            // Put the task in the correct list
            if (taskCompleted) {
                $('#completedTaskList').append($newTaskTemplate)
            } else {
                $('#taskList').append($newTaskTemplate)
            }

            // Show the task
            $newTaskTemplate.show()
        }
    },

    render: async () => {
        if (App.loading) {
            return;
        }
        App.setLoading(true)
        $('#account').html(App.todoList.address)
        App.setLoading(false)
    }


}

$(() => {
    $(window).load(() => {
        App.load()
    })
})
