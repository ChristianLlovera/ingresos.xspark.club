const visibility = (actions, elem) => {
    if (typeof window !== 'undefined') {
        const { visible, hidden } = actions
        const element = document.querySelector(elem)
        const callback = (entries, observer) => {

            if (entries[0].isIntersecting) {
                visible()
            } else {
                hidden()
            }
        }

        const observer = new IntersectionObserver(callback, {})
        observer.observe(element)
    }
}

export default visibility