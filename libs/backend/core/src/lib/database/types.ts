export interface PrismaClient {
    $connect(): Promise<void>;
    $disconnect(): Promise<void>;
}
