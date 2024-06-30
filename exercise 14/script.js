let text=['Reading your Files',
    'Password files Detected',
    'Sending all Passwords and personal Files to Server',
    'Cleaning Up']

async function main(){
    const randomDelay= ()=>{
        random=1+ 5*Math.random()
        let p=new Promise((resolve,reject)=>{
            setTimeout(() => {
                resolve()
            }, random*1000);
        })
        return p
    }

    const visibleTxt =()=>{
        let t=document.getElementsByClassName('post')
        t[0].style.display='block';

    }

    const hideAllDivs = () => {
        let divs = document.getElementsByTagName('div');
        for (let div of divs) {
            div.style.display = 'none';
        }
    }

    const t=setInterval(() => {
        let last=document.body.getElementsByTagName('div');
        last=last[last.length-1]
        if(last.innerHTML.endsWith('...')){
            last.innerHTML=last.innerHTML.slice(0,last.innerHTML.length-3)
        }
        else{
            last.innerHTML=last.innerHTML+'.'
        }
    
    }, 100);
    
    
    const addItem= async (item)=>{
        await randomDelay()
        let p=document.createElement('div')
        p.innerHTML=item
        document.body.append(p)
    }
    
    for (const iterator of text) {
        await addItem(iterator)
    }
    await randomDelay()
    clearInterval(t)
    hideAllDivs()
    visibleTxt()
}

main()