// SPDX-License-Identifier: MIT

pragma solidity 0.8.18; // Definindo a versão de Solidity 

// Criando uma Struct
struct Tweet {
    address author; // Endereço da carteira do autor do Tweet
    string text; // Texto do Tweet
    uint timestamp; // Quando esse tweet foi feito
    string username; // Nome do autor (caso queira se identificar)
}

// Criar o contrato
contract CrypTwitter {

    // Declarando uma variável de estado
    uint public nextId = 0;

    // Declarando uma constante 
    uint public constant PAGE_SIZE = 10;

    mapping(uint => Tweet) public tweets;

    mapping(address => string) public users;

    function addTweet(string calldata text) public {
        Tweet memory newTweet;
        newTweet.text = text;
        newTweet.author = msg.sender; // Endereço da carteira de quem enviou a mensagem
        newTweet.timestamp = block.timestamp; // block = Traz informações de onde está sendo salvo na blockchain

        // Gerando o id do Tweet
        nextId++;
        tweets[nextId] = newTweet; 
    }

    function changeUsername(string calldata newName) public {
        users[msg.sender] = newName;
    }

    // 20 tweets
    // 10 mais recentes -> 1 à 10
    // mais 10 -> 11 à 20
    function getLastTweets (uint page) public view returns (Tweet[] memory) { // Essa função é do tipo apenas leitura, ou seja, não escreve dados na blockchain  
        if (page < 1) page = 1;
        uint startIndex = (PAGE_SIZE * (page - 1)) + 1; // O índice inicial é 0

        // Preparando o array de Tweets em memória
        Tweet[] memory lastTweets = new Tweet[](PAGE_SIZE);
        for(uint i = 0; i < PAGE_SIZE; i++) {
            lastTweets[i] = tweets[startIndex + i];
            lastTweets[i].username = users[lastTweets[i].author];
        }

        return lastTweets;
    }

}