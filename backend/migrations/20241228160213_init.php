<?php

declare(strict_types=1);

use Phoenix\Migration\AbstractMigration;

final class Init extends AbstractMigration
{
  protected function up(): void
  {
    $this->table('progetti')
      ->addColumn('progetto', 'string', ['length' => 255])
      ->addColumn('performance', 'float')
      ->addColumn('img', 'string', ['length' => 255])
      ->create();

    $this->insert('progetti', [
      ['progetto' => 'Diabete Mellito', 'performance' => 70.00, 'img' => 'img/diabete.jpg'],
      ['progetto' => 'Ipertensione arteriosa', 'performance' => 34.00, 'img' => 'img/pressione.jpg'],
      ['progetto' => 'Bpco', 'performance' => 26.00, 'img' => 'img/bpco.jpg'],
      ['progetto' => 'Asma', 'performance' => 80.00, 'img' => 'img/asma.jpg'],
      ['progetto' => 'Analisi Spesa farmaceutica', 'performance' => 12.00, 'img' => 'img/spesa.jpg'],
      ['progetto' => 'Vaccinazione Antiinfluenzale', 'performance' => 36.00, 'img' => 'img/vaccinazione.jpg'],
      ['progetto' => 'Screening Mammografie', 'performance' => 55.00, 'img' => 'img/screening.jpg'],
      ['progetto' => 'Audit di ingresso', 'performance' => 81.00, 'img' => 'img/audit.jpg'],
      ['progetto' => 'Analisi Visite', 'performance' => 23.00, 'img' => 'img/visite.jpg'],
    ]);
  }

  protected function down(): void
  {
    $this->table('progetti')->drop();
  }
}
