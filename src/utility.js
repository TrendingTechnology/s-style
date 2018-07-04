function Utility() {
    let API = {
        helpers: {
            freeze: freeze,
            isEqual: isEqual,
            isEmpty: isEmpty,
            isDefined: isDefined,
            convert: convert,
            clean: clean
        },
        constants: {
            scrollBarWidth: 'undefined',
            scrollBarHeight: 'undefined'
        }
    }

    /**
    * @name freeze
    * @param {*} a  - frozen
    * @desc makes the passed in item immutable via stringification
    * @returns {*} frozen item
    */
    function freeze(a) {
        // non primative
        if (typeof a === 'object') {
            return JSON.parse(JSON.stringify(a));
        }

        // primative
        return a;
    }

    /**
    * @name isEqual
    * @param {*} a - a value to compare
    * @param {*} b - b value to compare
    * @desc check if two values are equal
    * @returns {boolean} - equality check
    */
    function isEqual(a, b) {
        // TODO: Put in a proper equality check
        return JSON.stringify(a) === JSON.stringify(b)
    }

    /**
    * @name isEmpty
    * @param {*} a  - checked for emptiness
    * @desc checks whether an item is empty or not
    * @returns {boolean} truthy value if the passed in item is empty or not
    */
    function isEmpty(a) {
        // check if null or undefined
        if (a === null || a === undefined) {
            return true;
        }

        // string check
        if (typeof a === 'string') {
            return !a.length;
        }

        // object check
        if (typeof a === 'object') {
            // array check
            if (Array.isArray(a)) {
                return !a.length;
            }

            // object check
            for (let i in a) {
                if (a.hasOwnProperty(i)) {
                    return false;
                }
            }

            return JSON.stringify(a) === JSON.stringify({});
        }

        return false;
    }

    /**
     * @name isDefined
     * @param {*} a  - checked if it is defined
     * @desc checks whether an item is defined
     * @returns {boolean} truthy value if the passed in item is defined
     */
    function isDefined(a) {
        return !(a === undefined)
    }

    /**
    * @name convert
    * @param {*} raw - raw value
    * @param {string} model - model to grab the value of (in format of a.b.c)
    * @param {string} type - type of cleaning to do
    * @desc traverse based on the model and convert the value
    * @returns {*} converted value
    */
    function convert(raw, model, type) {
        let converted = freeze(raw) // needs to be immutable

        if (model && converted) {
            model = model.split('.') //convert to array so we can traverse over the proerty
            for (let a of model) {
                if (!converted) {
                    break
                }

                converted = converted[a]
            }
        }

        if (type) {
            return clean(converted, type)
        }

        return converted
    }

    // convert to a viewable or model option
    /**
    * @name clean
    * @param {*} raw - raw value
    * @param {string} type - type of cleaning to do
    * @desc clean the raw value based on the type
    * @returns {string} cleaned value
    */
    function clean(raw, type) {
        if (type === 'display') {
            if (raw === null) {
                return 'null'
            } else {
                return String(raw)
            }
        } else if (type === 'value') {
            if (raw === 'null') {
                return null
            }
        } else if (type === 'search') {
            return String(raw).replace(/ /g, '_').toUpperCase()
        }
        return raw
    }

    /**
    * @name _getScrollDimensions
    * @desc get the dimensions of the scroll
    */
    function _getScrollDimensions() {
        //add virtual
        let virtualEle = document.createElement('div');
        virtualEle.style.width = '100px';
        virtualEle.style.height = '100px';
        virtualEle.style.overflow = 'scroll';
        virtualEle.style.position = 'absolute';
        virtualEle.style.top = '-99999px';
        virtualEle.style.left = '-99999px';
        document.body.appendChild(virtualEle);

        //set dimensions
        API.constants.scrollBarWidth = virtualEle.offsetWidth - virtualEle.clientWidth
        API.constants.scrollBarHeight = virtualEle.offsetHeight - virtualEle.clientHeight

        //remove virtual
        document.body.removeChild(virtualEle);
    }

    /** Initialize */
    _getScrollDimensions();

    return API
}

export default Utility()