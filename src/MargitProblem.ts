window.addEventListener('load', () => {
    // @ts-ignore
    require(['Problem', 'BitSet', 'Margit'], (...args) => {
        let Problem = args[0].Problem;
        let Margit = args[2].Margit;
        Problem.of(new Margit()).then(problem => {
            const dimacs = problem.toDIMACS();
            console.log(dimacs)
            document.getElementById('result').innerText = dimacs;
            document.getElementById('resultClean').innerText = problem.toCleanString();
        });
    });
})

