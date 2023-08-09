export const network = [
    {
        networkiconUrl:"https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574",
        networkName:"Avalanche",
        id:0,
        networkType:"Testnet",
        chainId:"43113"
    },
    {
        networkiconUrl:"https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912",
        networkName:"Polygon",
        id:1,
        networkType:"Testnet",
        chainId:"80001"
    },
    {
        networkiconUrl:"https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F2258429883-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fspaces%252F-MO36nlUvK8SxfXw1MFs%252Favatar-1607536782608.png%3Fgeneration%3D1607536782921877%26alt%3Dmedia",
        networkName:"RGB",
        id:2,
        networkType:"Regnet",
        chainId:"24"
    }
]


export const mapnetworks = new Map();

mapnetworks.set("43113", {
    networkiconUrl:"https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574",
    networkName:"Avalanche",
    id:0,
    networkType:"Testnet",
    chainId:"43113"
})
mapnetworks.set("80001",{
    networkiconUrl:"https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912",
    networkName:"Polygon",
    id:1,
    networkType:"Testnet",
    chainId:"80001"
})
mapnetworks.set("24",{
    networkiconUrl:"https://www.gitbook.com/cdn-cgi/image/width=35,dpr=2,height=35,fit=contain,format=auto/https%3A%2F%2F2258429883-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fspaces%252F-MO36nlUvK8SxfXw1MFs%252Favatar-1607536782608.png%3Fgeneration%3D1607536782921877%26alt%3Dmedia",
    networkName:"RGB",
    id:2,
    networkType:"Regnet",
    chainId:"24"
})
export function getValue(chainId){
     return mapnetworks.get(chainId);
}