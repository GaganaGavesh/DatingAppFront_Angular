//me interface eka tynne headers walin ena pagination data daganna
//mata therena widiyata api me SPA eke interface ekak hadaganne monawa hari data tikak format 
//karala eka thanaka tyaganna ona wage unama, api object hadana wa nam aniwa class ekak onamai
export interface Pagination{
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;//type eka dala nathnam any thama watenne, ethakota run time ekedi thama typw eka daganne
}

export class PaginatedResult<T>{
    result: T;//paginate una users la tika thama mekata enne
    pagination: Pagination;//pagination header eke ena ewa tika thama methenta enne
    //me class eka generic type class ekak so meka generic una kiyala class eke amuthu weyak wenne ne
    //meken hadena object wala T yodagena tyna properties meken object construct karaddi ewana type ekata thama hadenne
    //Ex: - const users = new PaginatedResult<User[]>();
    //result kiyana eken hold karaganneme users kiyana eak e result kiyana eka User[] type eke thama tynne
}