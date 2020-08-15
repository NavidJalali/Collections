import deepCopy from '../util/DeepCopy'

const HeadOfNil = new Error("Head of Nil")
const TailOfNil = new Error("Tail of Nil")

export default class List<T> {
    private _head: T | null
    private _tail: List<T> | null

    private constructor(head: T | null, tail: List<T> | null) {
        this._head = head
        this._tail = tail
    }

    public static empty<V>(): List<V> { return new List<V>(null, null) }

    public static fromArray<V>(arr: V[]): List<V> {
        const t: V[] = deepCopy(arr).filter(x => x != undefined || x != null).reverse()
        let result: List<V> = List.empty<V>()
        t.forEach(e => result = new List<V>(e, result))
        return result
    }

    public static from<V>(...arr: V[]): List<V> {
        return List.fromArray(arr)
    }

    public isEmpty = () => (this._head === null)

    public head(): T {
        if (this._head === null) { throw HeadOfNil } 
        else { return this._head }
    }

    public tail(): List<T> {
        if (this._tail === null) { throw TailOfNil } 
        else { return this._tail }
    }

    public toArray = (): T[] => {
        const result = []
        let node: List<T> = this
        while(!node.isEmpty()) {
            result.push(node.head())
            node = node.tail()
        }
        return result
    }

    public length(): number {
        let result = 0
        let node: List<T> = this
        while(!node.isEmpty()) {
            result++
            node = node.tail()
        }
        return result
    }

    public prepend = (elem: T): List<T> => {
        return new List<T>(elem, deepCopy(this))
    }

    public map<V>(f: (p: T) => V): List<V> {
        if(this.isEmpty()) { return List.empty<V>() }
        else {
            return new List<V>(f(deepCopy(this.head())), this.tail().map<V>(f))
        }
    }

    public filter(f: (p:T) => boolean): List<T> {
        if (this.isEmpty()) { return List.empty<T>() }
        else {
            return (f(this.head())) 
            ? new List<T>(deepCopy(this.head()), this.tail().filter(f))
            : this.tail().filter(f)
        }
    }
}
