export function saying_hi(name="tout le monde")
{
    console.log("HI "+name+" !" );
}

//fonction fléché, le plus courant aujd
export const dire_aurevoir = (name = 'toi')=>{
    console.log(`Aurevoir ${name} !`);
}
