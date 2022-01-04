export class PharmacyViewDto {
  constructor (pharmacyId, dateApplied, status, name, address) {
    this.pharmacyId = pharmacyId
    this.dateApplied = dateApplied
    this.status = status
    this.name = name
    this.address = address
  }
}
