export class ResponseDto {

    status!: boolean;
    data: any;
    error!: string;

    
    makeSuccessResponse(data: any) {
        this.status = true;
        this.data = data;
        return this;
    }
    
    makeFailureResponse(error: string) {
        this.status = false;
        this.error = error;
        return this;
    }

}