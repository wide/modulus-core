## Masters

Masters are top-level logic (often called "controller") loaded when the body is ready. They use the same `Component` class as regular components.


###  Create a master

Run the following command:
```
npm run create:master my-master
```

The file `masters/my-master.js` will be created with the following content:
```js
import Component from 'modulus/component'

export default class MyMaster extends Component {

  onInit() {

  }

}
```

Once created, you will need to register it in `main.js`:
```js
import Modulus from 'modulus'
import MyMaster from '~/masters/my-master'

export default new Modulus({
  masters: {
    MyMaster
  }
})
```