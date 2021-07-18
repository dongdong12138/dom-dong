window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {

    let elements
    if (typeof selectorOrArrayOrTemplate === "string") {
        if (selectorOrArrayOrTemplate[0] === "<") {
            // 创建 div
            elements = [createElement(selectorOrArrayOrTemplate)]
        } else {
            // 查找 div
            elements = document.querySelectorAll(selectorOrArrayOrTemplate)
        }
    }
    if (selectorOrArrayOrTemplate instanceof Array) {
        elements = selectorOrArrayOrTemplate
    }

    function createElement(string) {
        const container = document.createElement("template")
        container.innerHTML = string.trim()
        return container.content.firstChild
    }

    /* jQuery 精髓：1. 使用闭包，访问外部变量，使得外部变量一直存在，不会被浏览器回收
     * jQuery 精髓：2. return this，以此实现链式操作

    // api 可以操作 elements
    const api = {

        // 闭包：函数访问外部变量
        addClass(className) {
            for (let i = 0; i < elements.length; i ++) {
                elements[i].classList.add(className)
            }
            // return api      // api 对象中的函数又 return api，以此实现链式操作
            // 实际使用：api.addClass('red')
            // 相当于：  api.addClass.call(api, 'red')
            // 所以，this 就是 api
            return this
        }

    }
    return api

    // 以上代码可以改写成
    return {
        addClass(className) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add(className)
            }
            return this
        }
    }

    */

    const api = Object.create(jQuery.prototype)
    Object.assign(api, {
        elements: elements,
        oldApi: selectorOrArrayOrTemplate.oldApi
    })
    return api

}

jQuery.fn = jQuery.prototype = {

    constructor: jQuery,
    jquery: true,

    get(index) {
        return this.elements[index]
    },

    appendTo(node) {
        if (node instanceof Element) {
            this.each(el => node.appendChild(el))
        }
        if (node.jquery === true) {
            this.each(el => node.get(0).appendChild(el))
        }
    },

    append(children) {
        if (children instanceof Element) {
            this.get(0).appendChild(children)
        }
        if (children instanceof HTMLCollection) {
            for (let i = 0; i < children.length; i++) {
                this.get(0).appendChild(children[i])
            }
        }
        if (children.jquery === true) {
            children.each(node => this.get(0).appendChild(node))
        }
    },

    addClass(className) {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].classList.add(className)
        }
        return this
    },

    find(selector) {
        let array = []
        for (let i = 0; i < this.elements.length; i++) {
            const elements2 = Array.from(this.elements[i].querySelectorAll(selector))
            array = array.concat(elements2)
        }
        array.oldApi = this     // this 是旧的 api
        return jQuery(array)
    },

    end() {
        return this.oldApi      // this 是新的 api
    },

    each(fn) {
        for (let i = 0; i < this.elements.length; i++) {
            fn.call(null, this.elements[i], i)
        }
        return this
    },

    parent() {
        const array = []
        this.each((node) => {
            if (array.indexOf(node.parentNode) === -1) {
                array.push(node.parentNode)
            }
        })
        return jQuery(array)
    },

    children() {
        const array = []
        this.each((node) => {
            array.push(...node.children)
        })
        return jQuery(array)
    },

    print() {
        console.log(this.elements)
    }

}