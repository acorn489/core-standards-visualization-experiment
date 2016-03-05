export function getDomainsFromData(data) {
  let domains = [];
  data.grades.forEach(addGradeDomains(domains));
  domains.sort();
  return [...new Set(domains)];
}

function addGradeDomains(domains) {
  return (grade) => {
    domains.push(...grade.domains.map(domain => domain.name));
  };
}
