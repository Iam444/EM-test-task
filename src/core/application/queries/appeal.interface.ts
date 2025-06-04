export interface IAppeal {
    id: number,
    subject: string,
    content: string,
    createdAt: number,
    status: string,
    replyContent: string | null,
}
