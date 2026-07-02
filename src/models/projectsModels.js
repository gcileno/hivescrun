// Project Model
// Assinature of models for consuming and sending data to the API

// Assinutur api:
// class Project(models.Model):
//     name = models.CharField(max_length=100)
//     description = models.TextField(blank=True)
//     organization = models.ForeignKey(
//         Organization, 
//         on_delete=models.CASCADE, 
//         related_name='projects', 
//         blank=True, 
//         null=True
//         )
//     master = models.ForeignKey(Member, on_delete=models.SET_NULL, null=True, related_name='project_master')
//     key = models.CharField(max_length=10, help_text="Ex: SCRUN-01")

export const projectInput = (data) => {
  if (!data) return null;
    return {
        name: data.name || '',
        description: data.description || '',
        organization: data.organization || null,
        master: data.master || null,
        key: data.key || '',
    };
}

export const projectResponse = (data) => {
    if (!data) return null;
    return {
        id: data.id || null,
        name: data.name || '',
        description: data.description || '',
        organization: data.organization || null,
        master: data.master || null,
        key: data.key || '',
    };
}