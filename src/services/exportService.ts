export const exportToCSV = (data: Array<Record<string, any>>, fileName: string) => {
  const csvContent = [
    Object.keys(data[0]).join(','),
    ...data.map(item => Object.values(item).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}-${new Date().toISOString()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}; 