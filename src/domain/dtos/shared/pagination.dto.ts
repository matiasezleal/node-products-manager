export class PaginationDto {
    constructor(
        public readonly page: number,
        public readonly limit: number,
        public  totalPages: number,
        public data: any[]
    ) {}

    static create(props: { [key: string]: any }): [string?, PaginationDto?] {
        const { page, limit, total, totalPages, data } = props;

        if (isNaN(page) || page < 1) return ['Page must be a number greater than 0'];
        if (isNaN(limit) || limit < 1) return ['Limit must be a number greater than 0'];
        
        
        
        return [undefined, new PaginationDto(page, limit, total, data)];
    }

    setData(data: any[]){
        if (data.length === 0) return ['Data must be an array'];
        this.data = data;
    }

    setTotalPages(totalPages: number){
        if (isNaN(totalPages)) return ['Total must be a number'];
        this.totalPages = totalPages;
    }
}