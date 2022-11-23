import React from 'react'
import { AppContextInterface } from './models'
const context = React.createContext<AppContextInterface | null>(null);
export default context