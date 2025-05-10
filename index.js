// function orderIceCream(flavor) {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(`${flavor} ready`), 2000);
//   });
// }
// orderIceCream('vanilla')
//   .then(result => {
//     console.log(result);
//     return orderIceCream('chocolate');
//   })
//   .then(result => console.log(result))
//   .then(result => console.log('All orders are ready'));

async function serveIceCream() {
  try {
    console.log('Welcome to our Ice Cream Cafe');
    const vanilla = await orderIceCream('vanilla ice cream');
    console.log(vanilla);

  
    const chocolate= await orderIceCream('chocolate ice cream');
    console.log(chocolate);

    console.log("Enjoy your ice cream guys!")

  } catch (err) {
    console.log("oh oh ooooppss", err)
  }
}


serveIceCream();