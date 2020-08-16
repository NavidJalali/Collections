/*

TESTING GROUNDS FOR NOW 

*/

import List from './List'

const l = List.from(1, 2, 4, 5, 6, 7)

const v = l.toView().map(_ => 2 * _).filter(_ => _ < 7).map(_ => _.toString())
console.log(v.force().toArray())