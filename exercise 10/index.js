function individualComb(a,b,c){
    let chk=Math.random();
    if (chk<=0.33){
        return a;
    }
    else if(chk>0.33 && chk<=0.66){
        return b;
    }
    else{
        return c;
    }
}

let a1='Crazy';
let a2='Amazing';
let a3='Fire';

let b1= 'Engine';
let b2='Foods';
let b3='Garments';

let c1='Bros';
let c2='Limited';
let c3='Hub';



console.log(individualComb(a1,a2,a3)+" "+individualComb(b1,b2,b3)+" "+individualComb(c1,c2,c3));
