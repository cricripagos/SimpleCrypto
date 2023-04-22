const chooseColor = (status) => {
    switch (status) {
        case 'success':
            return 'bg-green-300 text-black'
        case 'error':
            return 'bg-red-400 text-white'
        case 'warning':
            return 'bg-amber-300 text-black'
        default:
            return 'bg-sky-300 text-gray-800'
    }
}
export default chooseColor