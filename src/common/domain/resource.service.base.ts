import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { NotFoundException, Type } from '@nestjs/common';
import { EntityBase } from './entity.base';

export abstract class ResourceServiceBase<TEntity extends EntityBase, TReadDto> {
  protected constructor(
    protected readonly repository: Repository<TEntity>,
    protected readonly mapper: Mapper,
    protected readonly entityType: Type<TEntity>,
    protected readonly readDtoType: Type<TReadDto>,
  ) {}

  protected mapOne(entity: TEntity): TReadDto {
    return this.mapper.map(entity, this.entityType, this.readDtoType);
  }

  async readAll(): Promise<TReadDto[]> {
    const transactions = await this.repository.find();

    return transactions.map((value) => this.mapOne(value));
  }

  async readOne(id: number): Promise<TReadDto | undefined> {
    const entity = await this.repository.findOne({
      where: { id } as FindOptionsWhere<TEntity>,
    });

    return this.mapOne(entity);
  }
}

export abstract class ModifiableResourceServiceBase<
  TEntity extends EntityBase,
  TReadDto,
  TCreateDto,
  TUpdateDto,
> extends ResourceServiceBase<TEntity, TReadDto> {
  protected constructor(
    protected readonly repository: Repository<TEntity>,
    protected readonly mapper: Mapper,
    protected readonly entityType: Type<TEntity>,
    protected readonly readDtoType: Type<TReadDto>,
    protected readonly createDtoType: Type<TCreateDto>,
    protected readonly updateDtoType: Type<TUpdateDto>,
  ) {
    super(repository, mapper, entityType, readDtoType);
  }

  async create(dto: TCreateDto): Promise<TReadDto> {
    const toInsert = this.mapper.map(dto, this.createDtoType, this.entityType);

    const res = await this.repository.save(toInsert);

    return this.mapOne(res);
  }

  async delete(id: number): Promise<boolean> {
    const res = await this.repository.softDelete({ id } as FindOptionsWhere<TEntity>);

    const wasDeleted = (res.affected || 0) > 0;

    if (!wasDeleted) {
      throw new NotFoundException();
    }

    return wasDeleted;
  }

  async update(id: number, dto: TUpdateDto): Promise<TReadDto | undefined> {
    const existing = await this.repository.findOne({ where: { id } as FindOptionsWhere<TEntity> });

    if (!existing) {
      throw new NotFoundException();
    }

    const entity = this.mapper.map(dto, this.updateDtoType, this.entityType);
    const updated = await this.repository.save({ id, ...entity } as DeepPartial<TEntity>);

    return this.mapOne(Object.assign(updated, existing));
  }
}
