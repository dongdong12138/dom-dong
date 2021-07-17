window.dom = {

    /**
     * 创建元素
     * @param {String} string 标签的字符串形式
     * @returns 元素
     * 
     * 一开始使用 div 标签作为包裹容器，即 document.createElement('div')
     * 发现问题：如果传入 td 等标签，会返回 undefined
     * 原因是：根据 HTML 语法，td 只能放在 tr、table 等标签中，不能直接放在 div 中
     * 
     * 所以将包裹容器改为 template 标签，即 document.createElement('template')
     * template 标签本身就是一个包裹容器，可以包含任何标签
     * 但是使用 template 标签，在获取第一个子元素时：
     *      - 不能使用 container.children[0]
     *      - 而应该使用 container.content.firstChild
     */
    create(string) {
        const container = document.createElement('template')
        container.innerHTML = string.trim()
        return container.content.firstChild
    },

    /**
     * 在目标节点后面插入节点
     * @param {nodeObject} node 目标节点
     * @param {nodeObject} insertNode 插入节点
     */
    after(node, insertNode) {
        node.parentNode.insertBefore(insertNode, node.nextSibling)
    },

    /**
     * 在目标节点之前插入节点
     * @param {nodeObject} node 目标节点
     * @param {nodeObject} insertNode 插入节点
     */
    before(node, insertNode) {
        node.parentNode.insertBefore(insertNode, node)
    },

    /**
     * 给父节点新增一个子节点
     * @param {nodeObject} parentNode 父节点
     * @param {nodeObject} childNode 子节点
     */
    append(parentNode, childNode) {
        parentNode.appendChild(childNode)
    },

    /**
     * 给目标节点增加一个父节点
     * @param {nodeObject} node 目标节点
     * @param {nodeObject} parentNode 父节点
     */
    wrap(node, parentNode) {
        dom.before(node, parentNode)
        dom.append(parentNode, node)
    },

    /**
     * 删除目标节点
     * @param {nodeObject} node 目标节点
     * @returns 被删除的节点
     */
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },

    /**
     * 清空目标节点的子元素
     * @param {nodeObject} node 目标节点
     * @returns 被清空的子元素
     */
    empty(node) {
        let { firstChild } = node
        const array = []
        while (firstChild) {
            array.push(dom.remove(firstChild))
            firstChild = node.firstChild
        }
        return array
    },

    /**
     * 获取或设置指定节点的属性
     * @param {nodeObject} node 目标节点
     * @param {String} name 属性名
     * @param {String} [value] 属性值(有属性值就是设置，无属性值就是获取)
     */
    attr(node, name, value) {
        // 根据参数个数的不同，执行不同的代码，就是重载
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        }
        if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },

    /**
     * 获取或设置指定节点的文本内容
     * @param {nodeObject} node 目标节点
     * @param {String} [value] 文本内容(有参数就是设置，无参数就是获取)
     * @returns 文本内容
     */
    text(node, value) {
        if (arguments.length === 2) {
            if (node.innerText) {           // 适配
                node.innerText = value      // IE
            } else {
                node.textContent = value    // Firefox、Chrome
            }
        }
        if (arguments.length === 1) {
            if (node.innerText) {
                return node.innerText
            } else {
                return node.textContent
            }
        }
    },

    /**
     * 获取或设置指定节点的html内容
     * @param {nodeObject} node 目标节点
     * @param {String} [value] html内容(有参数就是设置，无参数就是获取)
     * @returns html内容
     */
    html(node, value) {
        if (arguments.length === 2) {
            node.innerHTML = value
        }
        if (arguments.length === 1) {
            return node.innerHTML
        }
    },

    /**
     * 获取或设置指定节点的 style
     * @param {nodeObject} node 目标节点
     * @param {String or Object} name String-获取CSS属性值, Object-设置CSS属性
     * @param {String} [value] 设置的CSS属性值
     */
    style(node, name, value) {
        if (arguments.length === 3) {
            // dom.style(div, 'color', 'red')
            node.style[name] = value
        }
        if (arguments.length === 2) {
            if (typeof name === 'string') {
                // dom.style(div, 'color')
                return node.style[name]
            }
            if (name instanceof Object) {
                // dom.style(div, {color: 'red'})
                for (let key in name) {
                    node.style[key] = name[key]
                }
            }
        }
    },

    /**
     * 增加类名 / 移除类名 / 检测是否含有某个类名
     * @param {nodeObject} node 目标节点
     * @param {String} className 类名
     */
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        }
    },

    /**
     * 给指定节点新增事件
     * @param {nodeObject} node 目标节点
     * @param {String} eventName 事件名称
     * @param {Function} fn 执行函数
     */
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },

    /**
     * 移除指定节点的某个事件
     * @param {nodeObject} node 目标节点
     * @param {String} eventName 事件名称
     * @param {Function} fn 执行函数
     */
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },

    /**
     * 查找元素
     * @param {String} selector CSS选择器
     * @param {nodeObject} [scope] 指定节点中查找元素
     * @returns 元素数组
     */
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },

    /**
     * 查找指定节点的父节点
     * @param {nodeObject} node 目标节点
     * @returns 父节点
     */
    parent(node) {
        return node.parentNode
    },

    /**
     * 查找指定节点的子元素
     * @param {nodeObject} node 目标节点
     * @returns 子元素
     */
    children(node) {
        return node.children
    },

    /**
     * 查找指定节点的兄弟元素
     * @param {nodeObject} node 目标节点
     * @returns 兄弟元素
     */
    siblings(node) {
        return Array.from(node.parentNode.children).filter(n => n !== node)
    },

    /**
     * 查找目标节点的后一个元素
     * @param {nodeObject} node 目标节点
     * @returns 后一个元素或 null
     */
    next(node) {
        return node.nextElementSibling || null
    },

    /**
     * 查找目标节点的前一个元素
     * @param {nodeObject} node 目标节点
     * @returns 前一个元素或 null
     */
    previous(node) {
        return node.previousElementSibling || null
    },

    /**
     * 遍历节点，并对每个节点调用函数
     * @param {nodeArray} nodeList 节点伪数组
     * @param {*} fn 执行函数
     */
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i ++) {
            fn.call(null, nodeList[i])
        }
    },

    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i ++) {
            if (list[i] === node) break
        }
        return i
    }
    
}