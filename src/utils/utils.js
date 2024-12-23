
import { format } from 'date-fns';



export const formatDate = (dateToFormat) => {
    return  format(dateToFormat, 'dd/MM/yyyy HH:mm:ss')
}


export const sortData = (dat) => {
    return dat.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

}