// fazer sistema de detectar qual tipo de pa, continua regresiva ou progressiva

// Informações
/*    
    ? Informe PA e obtenha razao:
    Informe uma PA e o código informará a razão dessa PA

    ex: [2, 4, 6, 8]

    a[2] - a[1] = 2
    logo, R = 2

    ! Se a PA for regressiva, a conta será diferente

    ex: [-2, -4, -6, -8]

    -a[2] - a[1] = -2
    logo, R = -2


    ? Informe R e algum Termo e obtenha posições
    O determinado termo pode ser qualquer um, o código construirá uma PA
    pra pegar as posições requeridas

    ex: R = 2 // 1o termo = 4
    [4, 6, 8, 10, 12, 14, 16, 18, 20]

    a[8] = 18
    a[9] = 20
*/


// ===================================================== //
// Pegando os elementos
const inputsDiv = document.getElementById('inputsDiv')
const resDiv = document.getElementById('results')
const calc = document.getElementById('butao')
const rad = document.getElementsByName('rad')


// Configurando as funções dos rad
rad[0].onchange = () => inputsDiv.innerHTML = `
                P.A. <input type="number" class="pa"> <input type="number" class="pa"> <br>
                <strong><cinza>Exemplo:</cinza> <br>
                [2, 4, 6, 8] coloque 2 e 4</strong>
`
                
rad[1].onchange = () => inputsDiv.innerHTML = `
                R = <input type="number" id="r"> <br>
                <input type="number" class="termo">º termo = <input type="number" class="termo"><br>
                N = <input type="number" id="n"> <br>
                <br>
                <cinza>
                    <strong>Exemplo:</strong> <br> 
                    R = <strong>2</strong> <br>
                    <strong>1</strong>º termo = <strong>4</strong> <br>
                    N = <strong>3</strong> <br><br>

                    <strong>PA = [4, 6, 8, 10]
                    <br>
                    A3 = 8</strong>
                </cinza>
`

// Configurando o botão
calc.addEventListener('click', init)



// Função que dá início ao código
function init() {

    // Detectando qual requerimento do usuário
    if(rad[0].checked) {
        return a()
    } else if(rad[1].checked) {
        return b()
    }
}


// Informe PA e obtenha a razão
function a() {
    // Pra facilitar minha vida
    const inputs = document.getElementsByClassName('pa')
    const val1 = inputs[0].value.trim()
    const val2 = inputs[1].value.trim()
    
    // Verificando os inputs
    if(val1.length === 0 && val2.length === 0) {
        return window.alert('Preencha todos os campos')
    } else if(val1.length !== 0 && val2.length === 0) {
        return window.alert('preencha o segundo campo')
    } else if(val1.length === 0 && val2.length !== 0) {
        return window.alert('Preencha o primeiro campo')
    }


    // Fazendo a conta
    const r = val2 - val1

    // Colocando o resultado na div de resultados
    resDiv.innerHTML = `A razão é ${r}`
}


// Informe R e determinado termo e obtenha posições
function b() {
    // Pra facilitar minha vida
    const a = document.getElementsByClassName('termo')
    const termo = [ Number(a[0].value), Number(a[1].value) ]
    //
    const pos = Number(document.getElementById('n').value)
    let r = Number(document.getElementById('r').value)


    // Verificando os inputs
    if(r.length === 0 || pos.length === 0 || termo[0].lenght === 0 || termo[1].length === 0) {
        return window.alert('Preencha todos os campos')

    } else if (pos == 0) {
        return window.alert('"N" não pode ser 0')
    } else if (termo[0] == 0) {
        return window.alert('O 1º input do termo não pode ser 0')
    }


    // ==
    /*
      - Vendo o jeito de gerar a PA pra poder pegar a posição
     Progressivo, a PA vai ser gerada de trás pra frente;
     Regressivo, a PA vai ser gerada de frente pra trás;
    */
    // ==
    let progressivo = false
    let regressivo = false
    
    if (pos > termo[0]) {
        progressivo = true
    } else {
        regressivo = true
    }
    

    // Pegando o resultado
    let pa = [ termo[1] ]
    
    if (progressivo) {
        //
        let dnv = pos - 1

        for (dnv, i = 0; dnv > 0; dnv--, i++) {
            pa.push( pa[i] + r )
        }

        // Pegando a distância, pra gerar pra trás
        if (termo[1] > 1) {
            let dnv2 = termo[0] - 1
            let num = termo[1]

            for (dnv2; dnv2 > 0; dnv2--, num -= r) {
                pa.unshift(num - r)
            }
        }

    } else if (regressivo) {
        //

        
        // Pegando a distância, pra gerar pra trás
        if (termo[1] > 1) {
            let dnv2 = termo[0] - 1
            let num = termo[1]
            
            for (dnv2; dnv2 > 0; dnv2--, num -= r) {
                pa.unshift(num - r)
                console.log(pa)
            }

        } else {

            let dnv = termo[0] - pos

            for (dnv, i = 0; dnv > 0; dnv--, i++) {
                pa.push( pa[i] + r )
            }
        }
        //pa.reverse()
    }


    // Contas que serão exibidas na div de resultados
    let show_r = r
    if (r < 0) {
        show_r = `(${r})`
    } else {
        show_r = ` . ${r}`
    }

    let calc1 = `A${pos} = ${pa[0]} + (${pos}-1)${show_r} <br>`
    let calc2 = `A${pos} = ${pa[0]} + ${pos - 1}${show_r} <br>`
    let calc3 = `A${pos} = ${pa[0]} + ${ (pos-1) * r } <br>`
    let calc4 = `A${pos} = ${ pa[0] + (pos-1) * r }`

    // Apenas para diminuir o tamanho do código
    if (termo[0] == 1) {
        calc2 = calc2.replace('0 + ', '')
        calc3 = calc3.replace('0 + ', '')
        calc3 = calc3.replace('<br>', '')
        calc4 = calc4.replace(calc4, '')
    }
    
    // Juntando os resultados
    const calc = `${calc1}${calc2}${calc3}${calc4}`


    // Colocando o resultado na div
    resDiv.innerHTML = `
<p>
    <cinza>Resultado:</cinza> <br>
    PA = [${pa.join(', ')}] <br>
    A${pos} = ${pa[pos - 1]}
</p>

<p>
    <cinza>Cálculos:</cinza> <br>
    An = A1 + (n-1) . R <br><br>
    ${calc}
</p>
`
} 
