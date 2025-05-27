import {makeInstaller} from '@zquare/utils'
import components from './components'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
const installer =makeInstaller(components)
import '@zquare/theme/index.css'
//zhuhzu
library.add(fas);
export * from '../components'
export default installer