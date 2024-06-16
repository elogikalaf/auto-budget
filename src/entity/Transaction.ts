import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    amount: number 

    @Column()
    deposit: boolean

    @Column()
    description: string

}
