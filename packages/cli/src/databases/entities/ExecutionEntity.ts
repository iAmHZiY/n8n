import { ExecutionStatus, WorkflowExecuteMode } from 'n8n-workflow';
import { Column, Entity, Generated, Index, OneToMany, PrimaryColumn } from 'typeorm';
import { datetimeColumnType, jsonColumnType } from './AbstractEntity';
import { IWorkflowDb } from '@/Interfaces';
import type { IExecutionFlattedDb } from '@/Interfaces';
import { idStringifier } from '../utils/transformers';
import type { ExecutionMetadata } from './ExecutionMetadata';

@Entity({ name: 'T_N8NExecutionEntity' })
@Index(['workflowId', 'id'])
@Index(['waitTill', 'id'])
@Index(['finished', 'id'])
@Index(['workflowId', 'finished', 'id'])
@Index(['workflowId', 'waitTill', 'id'])
export class ExecutionEntity implements IExecutionFlattedDb {
	@Generated()
	@PrimaryColumn({ transformer: idStringifier, name: 'FId' })
	id: string;

	@Column('text', { name: 'FData' })
	data: string;

	@Column({ name: 'FFinished' })
	finished: boolean;

	@Column('varchar', { name: 'FMode' })
	mode: WorkflowExecuteMode;

	@Column({ nullable: true, name: 'FRetryOf' })
	retryOf: string;

	@Column({ nullable: true, name: 'FRetrySuccessId' })
	retrySuccessId: string;

	@Column('varchar', { nullable: true, name: 'FStatus' })
	status: ExecutionStatus;

	@Column({ type: datetimeColumnType, name: 'FStartedAt' })
	startedAt: Date;

	@Index()
	@Column({ type: datetimeColumnType, nullable: true, name: 'FStoppedAt' })
	stoppedAt: Date;

	@Column({ type: jsonColumnType, name: 'FWorkFlowData' })
	workflowData: IWorkflowDb;

	@Column({ nullable: true, transformer: idStringifier, name: 'FWorkflowId' })
	workflowId: string;

	@Column({ type: datetimeColumnType, nullable: true, name: 'FWaitTill' })
	waitTill: Date | null;

	@OneToMany('ExecutionMetadata', 'execution')
	metadata: ExecutionMetadata[];

	@Column({ name: 'FCheckCode' })
	checkCode: string;

	@Column({ name: 'FCheckCodeVersion' })
	checkCodeVersion: number;

	@Column({ type: datetimeColumnType, name: 'FModifyTime' })
	modifyTime: Date;
}
