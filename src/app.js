
window.addEventListener('load', async () => {

});

const App = {
    contracts: {},
    load: async () => {
        console.log('Loading app')
        await App.loadWeb3();
        console.log('Web3 loaded');
        await App.loadAccount();
        await App.loadContract();
        await App.render();
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
    render: async () => {
        $('#account').html(App.todoList.address)
    }


}

$(() => {
    $(window).load(() => {
        App.load()
    })
})
