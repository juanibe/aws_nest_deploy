import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetOneAplicationInput {
  @Field()
  id: number;
}

@InputType()
export class CreateAplicationInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ defaultValue: true, nullable: true })
  active?: boolean;
}

@InputType()
export class UpdateAplicationInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ defaultValue: true, nullable: true })
  active?: boolean;
}
