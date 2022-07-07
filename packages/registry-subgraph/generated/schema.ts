// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Package extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Package entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Package must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Package", id.toString(), this);
    }
  }

  static load(id: string): Package | null {
    return changetype<Package | null>(store.get("Package", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get description(): string {
    let value = this.get("description");
    return value!.toString();
  }

  set description(value: string) {
    this.set("description", Value.fromString(value));
  }

  get url(): string {
    let value = this.get("url");
    return value!.toString();
  }

  set url(value: string) {
    this.set("url", Value.fromString(value));
  }

  get tags(): Array<string> | null {
    let value = this.get("tags");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set tags(value: Array<string> | null) {
    if (!value) {
      this.unset("tags");
    } else {
      this.set("tags", Value.fromStringArray(<Array<string>>value));
    }
  }

  get versions(): Array<string> {
    let value = this.get("versions");
    return value!.toStringArray();
  }

  set versions(value: Array<string>) {
    this.set("versions", Value.fromStringArray(value));
  }

  get publisher(): Array<string> | null {
    let value = this.get("publisher");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set publisher(value: Array<string> | null) {
    if (!value) {
      this.unset("publisher");
    } else {
      this.set("publisher", Value.fromStringArray(<Array<string>>value));
    }
  }

  get verifiers(): Array<string> {
    let value = this.get("verifiers");
    return value!.toStringArray();
  }

  set verifiers(value: Array<string>) {
    this.set("verifiers", Value.fromStringArray(value));
  }
}

export class Publisher extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Publisher entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Publisher must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Publisher", id.toString(), this);
    }
  }

  static load(id: string): Publisher | null {
    return changetype<Publisher | null>(store.get("Publisher", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): string {
    let value = this.get("address");
    return value!.toString();
  }

  set address(value: string) {
    this.set("address", Value.fromString(value));
  }

  get cannon_package(): Array<string> | null {
    let value = this.get("cannon_package");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set cannon_package(value: Array<string> | null) {
    if (!value) {
      this.unset("cannon_package");
    } else {
      this.set("cannon_package", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class Version extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Version entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Version must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Version", id.toString(), this);
    }
  }

  static load(id: string): Version | null {
    return changetype<Version | null>(store.get("Version", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get cannon_package(): string {
    let value = this.get("cannon_package");
    return value!.toString();
  }

  set cannon_package(value: string) {
    this.set("cannon_package", Value.fromString(value));
  }

  get readme(): string {
    let value = this.get("readme");
    return value!.toString();
  }

  set readme(value: string) {
    this.set("readme", Value.fromString(value));
  }

  get cannonfile(): string {
    let value = this.get("cannonfile");
    return value!.toString();
  }

  set cannonfile(value: string) {
    this.set("cannonfile", Value.fromString(value));
  }

  get added(): BigInt {
    let value = this.get("added");
    return value!.toBigInt();
  }

  set added(value: BigInt) {
    this.set("added", Value.fromBigInt(value));
  }

  get dependents(): Array<string> | null {
    let value = this.get("dependents");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set dependents(value: Array<string> | null) {
    if (!value) {
      this.unset("dependents");
    } else {
      this.set("dependents", Value.fromStringArray(<Array<string>>value));
    }
  }

  get dependencies(): Array<string> | null {
    let value = this.get("dependencies");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set dependencies(value: Array<string> | null) {
    if (!value) {
      this.unset("dependencies");
    } else {
      this.set("dependencies", Value.fromStringArray(<Array<string>>value));
    }
  }

  get chains(): Array<string> {
    let value = this.get("chains");
    return value!.toStringArray();
  }

  set chains(value: Array<string>) {
    this.set("chains", Value.fromStringArray(value));
  }
}

export class Chain extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Chain entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Chain must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Chain", id.toString(), this);
    }
  }

  static load(id: string): Chain | null {
    return changetype<Chain | null>(store.get("Chain", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get chain_id(): BigInt {
    let value = this.get("chain_id");
    return value!.toBigInt();
  }

  set chain_id(value: BigInt) {
    this.set("chain_id", Value.fromBigInt(value));
  }

  get version(): string {
    let value = this.get("version");
    return value!.toString();
  }

  set version(value: string) {
    this.set("version", Value.fromString(value));
  }

  get presets(): Array<string> {
    let value = this.get("presets");
    return value!.toStringArray();
  }

  set presets(value: Array<string>) {
    this.set("presets", Value.fromStringArray(value));
  }
}

export class Preset extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Preset entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Preset must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Preset", id.toString(), this);
    }
  }

  static load(id: string): Preset | null {
    return changetype<Preset | null>(store.get("Preset", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get chain(): string {
    let value = this.get("chain");
    return value!.toString();
  }

  set chain(value: string) {
    this.set("chain", Value.fromString(value));
  }
}

export class Tag extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Tag entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Tag must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Tag", id.toString(), this);
    }
  }

  static load(id: string): Tag | null {
    return changetype<Tag | null>(store.get("Tag", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get count(): BigInt {
    let value = this.get("count");
    return value!.toBigInt();
  }

  set count(value: BigInt) {
    this.set("count", Value.fromBigInt(value));
  }

  get cannon_packages(): Array<string> | null {
    let value = this.get("cannon_packages");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set cannon_packages(value: Array<string> | null) {
    if (!value) {
      this.unset("cannon_packages");
    } else {
      this.set("cannon_packages", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class DependencyDependent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save DependencyDependent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type DependencyDependent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("DependencyDependent", id.toString(), this);
    }
  }

  static load(id: string): DependencyDependent | null {
    return changetype<DependencyDependent | null>(
      store.get("DependencyDependent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get dependency(): string {
    let value = this.get("dependency");
    return value!.toString();
  }

  set dependency(value: string) {
    this.set("dependency", Value.fromString(value));
  }

  get dependent(): string {
    let value = this.get("dependent");
    return value!.toString();
  }

  set dependent(value: string) {
    this.set("dependent", Value.fromString(value));
  }
}

export class PackageTag extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save PackageTag entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PackageTag must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("PackageTag", id.toString(), this);
    }
  }

  static load(id: string): PackageTag | null {
    return changetype<PackageTag | null>(store.get("PackageTag", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get cannon_package(): string {
    let value = this.get("cannon_package");
    return value!.toString();
  }

  set cannon_package(value: string) {
    this.set("cannon_package", Value.fromString(value));
  }

  get tag(): string {
    let value = this.get("tag");
    return value!.toString();
  }

  set tag(value: string) {
    this.set("tag", Value.fromString(value));
  }
}

export class PackagePublisher extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save PackagePublisher entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PackagePublisher must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("PackagePublisher", id.toString(), this);
    }
  }

  static load(id: string): PackagePublisher | null {
    return changetype<PackagePublisher | null>(
      store.get("PackagePublisher", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get cannon_package(): string {
    let value = this.get("cannon_package");
    return value!.toString();
  }

  set cannon_package(value: string) {
    this.set("cannon_package", Value.fromString(value));
  }

  get publisher(): string {
    let value = this.get("publisher");
    return value!.toString();
  }

  set publisher(value: string) {
    this.set("publisher", Value.fromString(value));
  }
}
