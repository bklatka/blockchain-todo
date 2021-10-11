
window.addEventListener('load', async () => {

});

const App = {
    load: async () => {
        console.log('Loading app')
        await App.loadWeb3();
        console.log('Web3 loaded');
        await App.loadAccount();
    },
    loadWeb3: async () => {
        window.web3 = new Web3(Web3.givenProvider || 'ws://localhost:7545');
    },
    loadAccount: async () => {
        App.account = web3.eth.accounts[0]
        console.log(App.account)
    }

}

$(() => {
    $(window).load(() => {
        App.load()
    })
})
