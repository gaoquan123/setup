# demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build:dev|uat|prod
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# ecarts 按需引入
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')			//柱状图
require('echarts/lib/chart/pie')			//饼图
//下面的是需要的提示框
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')

# element 按需引入
src\utils\element.js
import { Button, Input, Radio, Table, Form } from "element-ui";
const coms = [Button, Input, Radio, Table, Form];
