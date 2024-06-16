import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  amount: number

  @Column()
  deposit: boolean

  @Column({ nullable: true })
  description: string

  @Column()
  date: Date

  @Column({ nullable: true })
  bank: string

}
