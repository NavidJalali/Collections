import List from '../List'

type Filter<T> = (t: T) => boolean

export default class View<T, V> {
    private list: List<T>
    private transform: (t: T) => V
    private filters: Filter<T>[]
    
    private constructor(
        list: List<T>, 
        transform: (t: T) => V,
        filters: Filter<T>[]) {
        this.list = list,
        this.transform = transform
        this.filters = filters
    }

    map<Z>(f: (p: V) => Z): View<T, Z> {
        return new View<T, Z>(this.list, (t: T) => f(this.transform(t)), this.filters)
    }

    filter(f: (p: V) => boolean): View<T, V> {
        this.filters.push((t: T) => f(this.transform(t)))
        return this
    }

    force(): List<V> {
        if(this.filters.length == 0) {
            return this.list.map((_: T) => this.transform(_))
        } else {
            return this.list
                .filter(
                    (t: T) => this.filters
                        .map(f => f(t))
                        .reduce((accumulator, next) => accumulator || next)
                ).map(this.transform)
        }
    }

    static fromList<Z>(list: List<Z>): View<Z, Z> {
        return new View<Z, Z>(list, z => z, [])
    }
}
